"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, ShoppingCart } from "lucide-react";

import { formatBRL } from "@/lib/money";
import type { AddToCartItem, PdvProduct } from "./types";

export function PdvProductCard({
  product,
  onAdd,
}: {
  product: PdvProduct;
  onAdd: (item: AddToCartItem) => void;
}) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [sizeLabel, setSizeLabel] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const variant = product.variants.find((item) => item.id === variantId);
  const photo = variant?.imageUrl || product.imageUrl;
  const sizes = variant?.stocks ?? [];

  const add = () => {
    if (!variant || !sizeLabel) return;
    const stock = sizes.find((item) => item.sizeLabel === sizeLabel);
    if (!stock || stock.stock < 1) return;
    onAdd({
      productName: product.name,
      listPriceInCents: product.priceInCents,
      variantId: variant.id,
      sizeLabel,
      colorName: variant.colorName,
      swatchHex: variant.swatchHex,
      imageUrl: variant.imageUrl,
      unitPriceInCents: product.priceInCents,
      unitCostInCents: product.costInCents,
      available: stock.stock,
      quantity: 1,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="rounded-2xl border border-[#E8DCC6] bg-[#FBF8F0] p-3">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F4F0E6]">
          {photo ? (
            <Image
              src={photo}
              alt=""
              fill
              sizes="(max-width: 640px) 40vw, 200px"
              className="object-contain"
              unoptimized
            />
          ) : (
            <span
              className="block h-full w-full"
              style={{ backgroundColor: variant?.swatchHex ?? "#E4DCC8" }}
            />
          )}
        </div>

        <p className="mt-2 truncate text-xs font-semibold text-[#12100C]">{product.name}</p>
        <p className="tabular-price text-[11px] text-[#6E6858]">
          {formatBRL(product.priceInCents)}
        </p>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2" role="group" aria-label={`Cores de ${product.name}`}>
            {product.variants.map((item) => {
              const active = item.id === variantId;
              return (
                <button
                  key={item.id}
                  type="button"
                  title={item.colorName}
                  aria-label={item.colorName}
                  aria-pressed={active}
                  onClick={() => {
                    setVariantId(item.id);
                    setSizeLabel("");
                  }}
                  className={`h-7 w-7 cursor-pointer rounded-full border transition-transform ${
                    active
                      ? "scale-110 border-[#14120C] ring-2 ring-[#2B4538]/40"
                      : "border-black/10 hover:scale-105"
                  }`}
                  style={{ backgroundColor: item.swatchHex }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={add}
            disabled={!sizeLabel}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className={`relative inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              justAdded
                ? "border-[#2B4538] bg-[#2B4538] text-white"
                : "border-[#2B4538]/60 bg-white text-[#8A6A1F] hover:bg-[#2B4538]/10"
            }`}
          >
            {justAdded ? (
              <Plus className="h-4 w-4 rotate-45" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            {!justAdded && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2B4538] text-white">
                <Plus className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
            )}
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Tamanhos de ${product.name}`}>
          {sizes.map((item) => {
            const active = item.sizeLabel === sizeLabel;
            const empty = item.stock < 1;
            return (
              <button
                key={item.sizeLabel}
                type="button"
                disabled={empty}
                title={empty ? "Esgotado" : `${item.stock} disponível(is)`}
                aria-pressed={active}
                onClick={() => setSizeLabel(item.sizeLabel)}
                className={`tabular-price h-8 min-w-8 cursor-pointer rounded-full border px-2 text-[11px] font-semibold transition-colors ${
                  empty
                    ? "cursor-not-allowed border-[#E4DCC8] text-[#B9B1AB] line-through"
                    : active
                      ? "border-[#14120C] bg-[#14120C] text-white"
                      : "border-[#E4DCC8] bg-white text-[#4A463A] hover:border-rosegold hover:text-[#12100C]"
                }`}
              >
                {item.sizeLabel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
