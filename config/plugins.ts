export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          // Configuración para optimizar imágenes
          use_filename: true,
          unique_filename: true,
          overwrite: false,
          folder: 'strapi-uploads',
          // Asegurar que se use HTTPS
          secure: true,
        },
        uploadStream: {
          folder: 'strapi-uploads',
          secure: true,
        },
        delete: {},
      },
    },
  },
});
