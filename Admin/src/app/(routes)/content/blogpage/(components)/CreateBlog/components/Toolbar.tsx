"use client";

import React from "react";
import { AlignLeft, Link2, Plus, List, ListOrdered } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { type Editor } from "@tiptap/react";

interface ToolbarProps {
    editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-0.5 border-r border-[#E2E2E2] pr-2 mr-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-[#364440] transition-colors font-bold text-sm cursor-pointer ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-[#364440] transition-colors italic text-sm font-serif cursor-pointer ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-[#364440] transition-colors underline text-sm cursor-pointer ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                >
                    U
                </button>
            </div>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-2 hover:bg-gray-100 rounded text-[#364440] transition-colors cursor-pointer ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={setLink}
                    className={`p-2 hover:bg-gray-100 rounded text-[#364440] transition-colors cursor-pointer ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
                >
                    <Link2 className="w-4 h-4" />
                </button>

                <Popover>
                    <PopoverTrigger asChild>
                        <div
                            role="button"
                            tabIndex={0}
                            className="p-2 hover:bg-gray-100 rounded text-[#364440] transition-colors cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[180px] p-1.5 bg-white border-[#DEE7E4] rounded-[7px] shadow-[0px_6px_32.4px_0px_rgba(0,0,0,0.05)] z-[60]">
                        <div className="flex flex-col gap-0.5">
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded transition-colors group cursor-pointer w-full text-left ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
                            >
                                <List className="w-4 h-4 text-[#364440]" />
                                <span className="text-[14px] text-[#364440] font-normal">Bullet List</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded transition-colors group cursor-pointer w-full text-left ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
                            >
                                <ListOrdered className="w-4 h-4 text-[#364440]" />
                                <span className="text-[14px] text-[#364440] font-normal">Number List</span>
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
