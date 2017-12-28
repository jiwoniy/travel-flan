export default function getAlbumId(albums) {
  const arrayId = Object.keys(albums);
  return Math.max(...arrayId.map(id => Number(id))) + 1;
}
