"use client";

import React from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { adminHref } from "@/lib/cms/navigation";

export default function CmsLink(props: React.ComponentProps<typeof Link>) {
  const { isAdmin } = useAdmin();
  const href = typeof props.href === "string" ? adminHref(props.href, isAdmin) : props.href;
  return <Link {...props} href={href} />;
}
