"use client"

import { Plus} from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { AddCampusLifeDrawer } from "./modals/AddCampusLifeDrawer";
import CampusLifeItem from "./components/CampusLifeItem";
import CampusLifeItemType from "./types/type";



interface CampusLifeProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
    readOnly?: boolean;
}

export default function CampusLife({ formData, onUpdate, readOnly = false }: CampusLifeProps) {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CampusLifeItemType | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const campusLifeItems: CampusLifeItemType[] = formData.campusLife || [];

    const handleAddItem = (item: CampusLifeItemType) => {
        if (editingIndex !== null) {
            const newList = [...campusLifeItems];
            newList[editingIndex] = item;
            onUpdate("campusLife", newList);
        } else {
            onUpdate("campusLife", [...campusLifeItems, item]);
        }
        setIsAddDrawerOpen(false);
        setEditingItem(null);
        setEditingIndex(null);
    };

    const handleEditItem = (index: number) => {
        setEditingItem(campusLifeItems[index]);
        setEditingIndex(index);
        setIsAddDrawerOpen(true);
    };

    const handleDeleteItem = (index: number) => {
        const newList = campusLifeItems.filter((_, i) => i !== index);
        onUpdate("campusLife", newList);
    };

    const handleToggleActive = (index: number) => {
        const newList = [...campusLifeItems];
        newList[index] = { ...newList[index], isActive: !newList[index].isActive };
        onUpdate("campusLife", newList);
    };

    return (
        <div className="space-y-6 w-full pb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Campus Life</h3>
                    <p className="text-sm text-gray-500 text-pretty">Add and manage campus facilities, clubs, and student life details.</p>
                </div>
                {!readOnly && (
                    <Button
                        type="button"
                        onClick={() => {
                            setEditingItem(null);
                            setEditingIndex(null);
                            setIsAddDrawerOpen(true);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add New
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {campusLifeItems.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center bg-gray-50/50">
                        <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-gray-900 font-medium mb-1">No items added yet</h4>
                        <p className="text-gray-500 text-sm mb-6">Start by adding hostel life, sports facilities, or technical clubs.</p>
                    </div>
                ) : (
                    campusLifeItems.map((item, index) => (
                        <CampusLifeItem
                            key={index}
                            item={item}
                            index={index}
                            readOnly={readOnly}
                            handleEditItem={handleEditItem}
                            handleDeleteItem={handleDeleteItem}
                            handleToggleActive={handleToggleActive}
                        />
                    ))
                )}
            </div>

            <AddCampusLifeDrawer
                open={isAddDrawerOpen}
                onOpenChange={setIsAddDrawerOpen}
                onAdd={handleAddItem}
                editItem={editingItem}
            />
        </div>
    );
}
