export const fileUpload = async (file) => {

    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dntbtu6w4/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-hugme');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No se pudo cargar imagen');

        const cloudResp = await resp.json();
        return cloudResp.secure_url;

    } catch (error) {
        throw new Error(error.message)
    }
}