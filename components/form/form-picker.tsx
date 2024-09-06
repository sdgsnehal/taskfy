"use client";
import { unsplash } from "@/lib/unsplash";
import { useEffect, useState } from "react";
interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      }
    };
  });
  return <div>Form Picker</div>;
};
