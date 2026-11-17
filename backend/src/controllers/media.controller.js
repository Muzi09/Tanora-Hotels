import { MediaService } from '../services/media.service.js';

export async function uploadMedia(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided for upload',
      });
    }

    const altText = req.body.altText || '';
    const media = await MediaService.saveUploadedFile(req.file, req.admin, altText);

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: media,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMedia(req, res, next) {
  try {
    const { page, limit, search } = req.query;
    const result = await MediaService.listMedia({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
      search: search || '',
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMediaById(req, res, next) {
  try {
    const media = await MediaService.getMediaById(req.params.id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMedia(req, res, next) {
  try {
    const { altText } = req.body;
    const updated = await MediaService.updateMedia(req.params.id, { altText });
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Media updated',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteMedia(req, res, next) {
  try {
    await MediaService.deleteMedia(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
