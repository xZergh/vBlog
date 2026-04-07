export function getCompressedImageUrl(imageUrl, width, height, fit) {
  // Function to get compressed image URL based on dimensions
  if (!imageUrl) return imageUrl;

  // Check if it's a Sanity image URL
  if (imageUrl.includes('cdn.sanity.io')) {
    // Add Sanity image transformation parameters
    const separator = imageUrl.includes('?') ? '&' : '?';
    return `${imageUrl}${separator}w=${width}&h=${height}&fit=${fit}&auto=format&q=75`;
  }

  return imageUrl;
}
