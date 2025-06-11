"use client";

import { Camera } from "lucide-react";

import { useI18n } from "locales/client";
import { ImageUpload } from "@/shared/ui/image-upload";
import { getImageUrl } from "@/shared/lib/storage/get-image";
import { useProfileImageUpload } from "@/features/layout/authenticated-header";
import { useSession } from "@/features/auth/lib/auth-client";
import { useCurrentUser } from "@/entities/user/model/useCurrentUser";
import { brandedToast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileImageUploadForm({ isDisabled }: { isDisabled: boolean }) {
  const t = useI18n();
  const user = useCurrentUser();
  const uploadMutation = useProfileImageUpload();
  const { refetch: refetchSession } = useSession();

  const handleUploadSuccess = () => {
    brandedToast({ title: t("upload_success"), variant: "success" });
    refetchSession();
  };

  const handleUploadError = (error: Error) => {
    console.log("error:", error);

    if (error.message === "FILE_TOO_LARGE") {
      brandedToast({ title: t("FILE_TOO_LARGE"), variant: "error" });
    } else {
      brandedToast({ title: t("generic_error"), variant: "error" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <ImageUpload
        imageTypeLabel={t("profile_image")}
        initialImageUrl={user?.image ? getImageUrl(user.image) : null}
        isDisabled={isDisabled || uploadMutation.isPending}
        labelContent={<Camera className="size-7 text-white" />}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        placeholder={<Skeleton className="h-full w-full rounded-full bg-gray-500" />}
        previewClassName="rounded-full"
        previewSize={{ width: 72, height: 72 }}
        uploadMutation={uploadMutation}
      />
      <span className="text-xs text-gray-500">{t("profile_image_hint")}</span>
    </div>
  );
}
