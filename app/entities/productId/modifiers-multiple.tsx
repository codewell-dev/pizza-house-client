'use client'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Multiple from "../components/multiple";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useShopStore } from "@/app/providers/store-provider";
import { usePathname } from "next/navigation";

export default function ModifiersMultiple({ e }: any) {
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
    return <Accordion
        sx={{
            boxShadow: "none",
            border: 0,
            backgroundColor: "transparent",
        }}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ borderBottom: 1, borderRadius: 0, width: "100%", borderColor: 'silver' }}
        >
            <Typography component="div">{e.title}</Typography>
        </AccordionSummary>
        <AccordionDetails
            sx={{
                border: 1,
                borderColor: "rgba(0, 0, 0, 0.12)",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: 2,
            }}
        >
            {e.modifiers.map((i: any) => {
                // Знайдемо модифікатор у Zustand
                const modifierInStore = selectedModifiers.find((m) => m._id === i._id);
                const count = modifierInStore?.count ?? 0;

                return (
                    <div key={i._id}>
                        <div className="flex justify-between items-center">
                            <div>
                                <Typography component="span">{i.title}</Typography>
                            </div>
                            <div className="flex gap-3">
                                <Typography component="span">
                                    {i.weight} г / {i.price} ₴
                                </Typography>
                                <Multiple
                                    plusCount={() => addModifier(i)}
                                    minusCount={() => removeModifier(i.id)}
                                    countProduct={count}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </AccordionDetails>
    </Accordion>
}