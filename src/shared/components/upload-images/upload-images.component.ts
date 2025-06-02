import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import Compressor from 'compressorjs';
import { MessageService } from 'primeng/api';
import { GalleriaModule } from 'primeng/galleria';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { FileModel } from '../../../app/modules/intranet/maestros/models/file.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'ims-image-upload',
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss',
  standalone: true,
  imports: [
    GalleriaModule,
    CommonModule,
    ToastModule,
    MessageModule,
    MessagesModule,
  ],
  providers: [MessageService, AlertService],
})
export class ImageUploadComponent {
  @Output() imagesSelected = new EventEmitter<File[]>();
  @Output() imageDeleted = new EventEmitter<FileModel>();
  @Input() existingImages: FileModel[] = [];
  @Output() compressorActive = new EventEmitter<boolean>(false);

  displayCustom: boolean = false;
  activeIndex: number = 0;
  activeIndex2: number = 0;
  showPreviewImage: boolean = false;
  images: any[] = [];

  maxFileSize = 30 * 1024 * 1024; // máximo 30 MB

  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
  ) {}

  onImageUpload(event: any) {
    const files = event.target.files;
    const selectedFiles: File[] = [];
    this.compressorActive.emit(true);
    for (const file of files) {
      if (file.size > this.maxFileSize) {
        this.alertService.error(
          `La imagen "${file.name}" debe ser menor a 5MB.`,
        );
        console.log(`File size exceeds 5MB: ${file.size / 1024} KB`);
        continue;
      }
      new Compressor(file, {
        quality: 0.5,
        convertSize: 1000000,
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const name =
              compressedFile instanceof File ? compressedFile.name : file.name;
            this.images.push({
              itemImageSrc: e.target.result,
              thumbnailImageSrc: e.target.result,
              alt: name,
              title: name,
            });

            // Convertir Blob a File si es necesario
            const finalFile =
              compressedFile instanceof File
                ? compressedFile
                : new File([compressedFile], file.name, {
                    type: compressedFile.type,
                  });

            selectedFiles.push(finalFile);
            this.cdr.detectChanges();
          };
          reader.readAsDataURL(compressedFile);
        },
        error: (err) => {
          console.error(err.message);
        },
      });
    }
    setTimeout(() => {
      this.imagesSelected.emit(selectedFiles);
      this.compressorActive.emit(false);
    }, 1000);

    event.target.value = '';
  }

  onFileClick(event: Event): void {
    // event.preventDefault();
    event.stopPropagation();
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }
    this.imagesSelected.emit(files);
    event.target.value = '';
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  deleteExistingImage(index: number) {
    const deletedImage = this.existingImages.splice(index, 1)[0];
    this.imageDeleted.emit(deletedImage);
    this.cdr.detectChanges();
  }

  deleteImage(index: number) {
    this.images.splice(index, 1);
    this.cdr.detectChanges();
  }

  uploadImage() {
    this.displayCustom = true;
  }
  imageExistingPreview(index: number) {
    this.activeIndex2 = index;
    this.showPreviewImage = true;
  }
}
