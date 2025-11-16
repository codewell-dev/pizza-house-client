// src/components/ModifiersCheckboxList.tsx

'use client';

import { useShopStore } from "@/app/providers/store-provider";
import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material";
// import { clear } from "console"; // ❌ Видалено зайвий імпорт
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// ✅ Оновлений інтерфейс
export interface Modifier {
    _id: string; // ✅ Змінено на _id: string
    title: string;
    price: number;
    count?: number; 
}

interface ModifiersCheckboxListProps {
    title: string;
    modifiers: Modifier[];
    groupId: string; // ✅ Додано ID групи
    // productModifiers: Modifier[]; // ❌ Видалено, якщо не використовується
}

export default function ModifiersCheckboxList({
    title,
    modifiers,
    groupId, // ✅ Приймаємо ID групи
}: ModifiersCheckboxListProps) {
    const pathname = usePathname();

    const selectedModifiers = useShopStore((state) => state.modifiers);
    const addModifier = useShopStore((state) => state.addModifier);
    const removeModifier = useShopStore((state) => state.removeModifier);
    const clearModifiers = useShopStore((state) => state.clearModifiers);

    useEffect(() => {
        return () => {
            clearModifiers();
        };
    }, [pathname]);

    // 💡 Визначаємо, який модифікатор з поточної групи обраний
    const selectedInGroup = selectedModifiers.find(
        (m) => modifiers.some((mod) => mod._id === m._id)
    );

    // Перевіряє, чи модифікатор обраний
    const isSelected = (modId: string) => selectedInGroup?._id === modId;

    const handleToggle = (mod: Modifier) => {
        // Якщо елемент, який вже обраний, клікнуто знову (знімаємо вибір)
        if (isSelected(mod._id)) {
            removeModifier(mod._id);
        } else {
            // ✅ ЛОГІКА ОДИНИЧНОГО ВИБОРУ
            // 1. Видаляємо попередній обраний елемент з цієї групи
            if (selectedInGroup) {
                removeModifier(selectedInGroup._id); 
            }
            // 2. Додаємо новий елемент
            addModifier(mod);
        }
    };

    return (
        <FormGroup sx={{ mt: 2 }}>
            <Typography variant="subtitle1">{title}:</Typography>
            {modifiers.map((mod) => (
                <FormControlLabel
                    key={mod._id}
                    control={
                        <Checkbox
                            checked={isSelected(mod._id)}
                            onChange={() => handleToggle(mod)}
                            // Тут можна додати властивість name={groupId} для забезпечення 
                            // RadioGroup-поведінки, якщо б використовувався Radio
                        />
                    }
                    // ✅ Виправлено відображення ціни для 0
                    label={`${mod.title}${mod.price > 0 ? ` +${mod.price} ₴` : ''}`} 
                />
            ))}
        </FormGroup>
    );
}