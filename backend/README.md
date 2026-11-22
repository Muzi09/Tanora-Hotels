# Backend media storage

New uploads are stored as BSON binary data in the MongoDB `Media` collection.
The public `GET /api/media/:id/file` route streams those bytes back to the site;
the media list API omits the binary field to keep admin responses small.

Uploads are currently limited to 10 MiB. MongoDB's maximum BSON document size is
16 MiB, so keep that limit below the document cap. Use GridFS if the application
needs larger files.

Database storage survives backend restarts. To protect images from cluster loss
or accidental deletion, configure and retain MongoDB backups. Existing media
records only contain metadata and URLs; if their old disk files are missing,
upload those images again to store their bytes in MongoDB.
