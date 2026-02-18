"use client";

import { useState, FormEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";

interface ArticleSearchBarProps {
  defaultValue?: string;
}

const ArticleSearchBar = ({ defaultValue = "" }: ArticleSearchBarProps) => {
  const t = useTranslations("articles");
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string;
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      router.push(`/${locale}/articles?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`/${locale}/articles`);
    }
  };

  const handleClear = () => {
    setValue("");
    router.push(`/${locale}/articles`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="bg-transparent border-b border-[#0B1B3B]/20 py-2 pl-2 pr-16 outline-none text-[#0B1B3B] placeholder-gray-400 focus:border-[#D4C5A0] w-full md:w-72 transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-8 top-2 w-4 h-4 text-gray-400 hover:text-[#0B1B3B] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-0 top-2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4C5A0] hover:text-[#0B1B3B] transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ArticleSearchBar;
