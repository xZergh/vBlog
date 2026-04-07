type FitMode =
  | 'crop'
  | 'clip'
  | 'fill'
  | 'fillmax'
  | 'fit'
  | 'max'
  | 'scale'
  | 'min';

export function getCompressedImageUrl(
  imageUrl: string | undefined,
  width: number,
  height: number,
  fit: FitMode
): string | undefined {
  if (!imageUrl) {
    return imageUrl;
  }

  if (imageUrl.includes('cdn.sanity.io')) {
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}w=${width}&h=${height}&fit=${fit}&auto=format&q=75`;
  }

  return imageUrl;
}
