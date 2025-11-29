import Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "minio", // container name from Compose
  port: 9000, // S3 API port
  useSSL: false, // match Compose setup
  accessKey: process.env.MINIO_ROOT_USER!,
  secretKey: process.env.MINIO_ROOT_PASSWORD!,
});

export { minioClient };
