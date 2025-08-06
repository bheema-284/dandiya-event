'use client';
import { useEffect, useState } from 'react';

export default function GalleryCard() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const generated = [...Array(30)].map((_, index) => {
      const gender = Math.random() < 0.5 ? 'men' : 'women';
      const imageId = Math.floor(Math.random() * 90);

      return {
        id: index,
        image: `https://randomuser.me/api/portraits/${gender}/${imageId}.jpg`,
        alt: `Gallery image ${index + 1} (${gender})`,
      };
    });

    setGalleryItems(generated);
  }, []);

  const standardLayout = [
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-2 row-span-2' },
    { span: 'col-span-1 row-span-1' },
  ];

  const reversedLayout = [
    { span: 'col-span-2 row-span-2' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
    { span: 'col-span-1 row-span-1' },
  ];

  const combinedItems = galleryItems.map((item, index) => {
    const layoutIndex = index % 6;
    const isStandardLayout = Math.floor(index / 6) % 2 === 0;
    const layout = isStandardLayout ? standardLayout : reversedLayout;

    return {
      ...item,
      span: layout[layoutIndex].span,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h3 className="font-bold text-lg mb-2">Gallery</h3>
      <p className="text-gray-400 mb-4 text-sm">156 Photos</p>
      <div className="grid grid-cols-3 gap-2 overflow-y-scroll">
        {combinedItems.map((item) => (
          <div key={item.id} className={`${item.span} rounded overflow-hidden`}>
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
