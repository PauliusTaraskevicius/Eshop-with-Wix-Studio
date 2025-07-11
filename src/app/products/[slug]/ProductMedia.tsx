import { useEffect, useState } from "react";

import { WixImage } from "@/components/WixImage";
import { products } from "@wix/stores";
import { cn } from "@/lib/utils";
import { PlayIcon } from "lucide-react";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

export const ProductMedia = ({ media }: ProductMediaProps) => {
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className="basis-2/5 md:sticky md:top-10 h-fit space-y-5">
      <div className="aspect-square bg-secondary">
        {selectedImage?.url ? (
          <WixImage
            mediaIdentifier={selectedImage.url}
            alt={selectedImage.altText}
            width={1000}
            height={1000}
          />
        ) : selectedVideo?.url ? (
          <div className="flex size-full items-center bg-black">
            <video controls className="size-full">
              <source
                src={selectedVideo.url}
                type={`video/${selectedVideo.format}`}
              />
            </video>
          </div>
        ) : null}
      </div>
      {media.length > 1 && (
        <div className="flex flex-wrap gap-5">
          {media.map((mediaItem) => (
            <MediaPreview
              key={mediaItem._id}
              mediaItem={mediaItem}
              isSelected={mediaItem._id === selectedMedia?._id}
              onSelect={() => setSelectedMedia(mediaItem)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
interface MediaPreviewProps {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({ mediaItem, isSelected, onSelect }: MediaPreviewProps) {
  const imageUrl = mediaItem.image?.url;
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;
  const thumbnailUrl = mediaItem.thumbnail?.url;
  const resolvedThumbnailUrl =
    stillFrameMediaId && thumbnailUrl
      ? thumbnailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId
      : undefined;

  if (!imageUrl && !resolvedThumbnailUrl) return null;

  return (
    <div
      className={cn(
        "relative cursor-pointer bg-secondary",
        isSelected && " outline-1 outline-primary"
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || resolvedThumbnailUrl}
        alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
        height={100}
        width={100}
        onMouseEnter={onSelect}
      />
      {resolvedThumbnailUrl && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 rounded-full size-9 flex items-center justify-center">
          <PlayIcon className="size-5 text-white/60" />
        </span>
      )}
    </div>
  );
}
