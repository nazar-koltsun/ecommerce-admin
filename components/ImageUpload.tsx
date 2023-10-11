'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, Plus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import { Image as ImageType } from '@prisma/client';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => {
          return (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounder-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  variant="destructive"
                  size="icon"
                  type="button"
                  onClick={() => onRemove(url)}
                >
                  <Trash />
                </Button>
              </div>
              <Image className='object-cover' fill src={url} alt='' />
            </div>
          );
        })}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='ub6xabe5'>
        {({open}) => {
          const onClick = () => {
            open();
          }

          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={onClick}
            >
              <ImagePlus className='mr-2 w-4 h-4' />
              Upload an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
