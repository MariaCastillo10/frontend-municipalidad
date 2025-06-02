# Prime Quality Control

Frontend solution developed with Angular v18.
The project is built with good practices, such as the reuse of widgets, helpers, access security, lazy loading, etc.

## Modules

- Calibers
- Categories
- Customers
- File
- Inspections
- Locaties
- Packaging
- Planilla
- Plants
- Products
- Tags
- Tolerances
- Varieties
- Temperature
- QR

## Setup
### Local

#### Project Requirements

- Nodejs v18.x
- Angular v18

#### Commands to run the project

##### Installing dependencies

```npm install```

##### Project execution

```npm run start```

## Docker

### Requirements

Docker installed on your machine. You can download and install Docker from docker.com.

### Image construction

``` docker build -t prime-quality-control-frontend . ```

### Running the Docker Container

``` docker run -d -p 80:80 --name prime-quality-control-frontend prime-quality-control-frontend  ```

### Verification
After running the container, you can access your Angular application in your web browser at http://localhost.


