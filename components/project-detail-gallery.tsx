"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { withBasePath } from "@/lib/app-path";
import type { ProjectGalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";

type Props = {
  images: ProjectGalleryImage[];
  heading?: string;
  dialogTitle: string;
};

export function ProjectDetailGallery({
  images,
  heading = "화면 미리보기",
  dialogTitle,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbSwiperRef = useRef<SwiperType | null>(null);

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
    setOpen(true);
  }, []);

  if (!images.length) {
    return null;
  }

  return (
    <div className="rounded-[10px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <h2 className="text-xl font-semibold sm:text-2xl">{heading}</h2>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        썸네일을 누르면 크게 보기에서 같은 순서로 넘길 수 있습니다.
      </p>

      <div className="mt-5 border-t border-[var(--border)] pt-5">
        <Swiper
          modules={[Navigation]}
          spaceBetween={12}
          slidesPerView="auto"
          navigation
          onSwiper={(swiper) => {
            thumbSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          className="project-gallery-thumbs [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden sm:[&_.swiper-button-next]:flex sm:[&_.swiper-button-prev]:flex [&_.swiper-button-next]:text-[var(--foreground)] [&_.swiper-button-prev]:text-[var(--foreground)]"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={img.src}
              className="!w-[132px] sm:!w-[160px]"
            >
              <button
                type="button"
                onClick={() => openAt(index)}
                className={cn(
                  "relative block w-full overflow-hidden rounded-lg border-2 bg-[var(--background)] text-left transition-[border-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]",
                  activeIndex === index
                    ? "border-[var(--accent)] opacity-100"
                    : "border-transparent opacity-85 hover:opacity-100",
                )}
                aria-label={`${img.alt ?? `이미지 ${index + 1}`} 크게 보기`}
              >
                <span className="relative block aspect-[4/3] w-full">
                  <Image
                    src={withBasePath(img.src)}
                    alt={img.alt ?? ""}
                    fill
                    sizes="(max-width: 640px) 132px, 160px"
                    className="object-cover"
                  />
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 max-h-[min(90vh,900px)] w-[min(94vw,56rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-6"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Dialog.Title className="sr-only">{dialogTitle}</Dialog.Title>
            <Dialog.Description className="sr-only">
              좌우 화살표 또는 스와이프로 이미지를 넘길 수 있습니다.
            </Dialog.Description>

            <div className="relative pr-10">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] [&_.swiper-button-next]:text-[var(--foreground)] [&_.swiper-button-prev]:text-[var(--foreground)]">
                <Swiper
                  modules={[Navigation, Keyboard]}
                  navigation
                  keyboard={{ enabled: true }}
                  initialSlide={activeIndex}
                  onSwiper={(swiper) => {
                    swiper.slideTo(activeIndex, 0);
                  }}
                  onSlideChange={(swiper) => {
                    const i = swiper.activeIndex;
                    setActiveIndex(i);
                    thumbSwiperRef.current?.slideTo(i);
                  }}
                  className="h-full w-full"
                >
                  {images.map((img) => (
                    <SwiperSlide key={img.src}>
                      <div className="relative aspect-video w-full">
                        <Image
                          src={withBasePath(img.src)}
                          alt={img.alt ?? ""}
                          fill
                          sizes="(max-width: 896px) 94vw, 56rem"
                          className="object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <Dialog.Close
                type="button"
                className="absolute right-0 top-0 rounded-full p-2 text-[var(--muted-foreground)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                aria-label="갤러리 닫기"
              >
                <X className="size-5" />
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
