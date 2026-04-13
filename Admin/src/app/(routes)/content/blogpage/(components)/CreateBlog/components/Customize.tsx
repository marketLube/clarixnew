"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { ContentSection } from "@/src/components/ui/ContentSection";
import Toolbar from "./Toolbar";

interface CustomizeProps {
    content: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
}

export default function Customize({ content, onChange, readOnly = false }: CustomizeProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] px-3 py-2 text-[#364440] marker:text-[#364440] prose-headings:text-[#162447] prose-p:text-[#364440] prose-li:text-[#364440] prose-ol:text-[#364440] prose-ul:text-[#364440] prose-strong:text-[#162447] prose-a:text-blue-600',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
        editable: !readOnly,
    });

    // Handle external content updates (e.g. form reset)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    useEffect(() => {
        if (editor) {
            editor.setEditable(!readOnly);
        }
    }, [editor, readOnly]);

    return (
        <ContentSection
            id="customize-blog"
            title=""
            description=""
            icon={<Toolbar editor={editor} />}
            className="customize-section"
            readOnly={readOnly}
        >
            <div className="space-y-6 pt-2">
                <div className="border border-[#DEE7E4] rounded-[8px] focus-within:ring-2 focus-within:ring-[#10B981] overflow-hidden bg-white">
                    <EditorContent editor={editor} />
                </div>
            </div>
            <style jsx global>{`
                .customize-section .bg-gray-50 {
                    background-color: transparent !important;
                    padding: 0 !important;
                }
                /* Basic Tiptap Styles */
                .ProseMirror {
                    color: #364440;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                    padding-left: 1.5em;
                    margin: 1em 0;
                    color: #364440;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                    padding-left: 1.5em;
                    margin: 1em 0;
                    color: #364440;
                }
                .ProseMirror h1 {
                    font-size: 2em;
                    font-weight: bold;
                    margin-top: 0.67em;
                    margin-bottom: 0.67em;
                    color: #162447;
                }
                .ProseMirror h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin-top: 0.83em;
                    margin-bottom: 0.83em;
                    color: #162447;
                }
                .ProseMirror h3 {
                    font-size: 1.17em;
                    font-weight: bold;
                    margin-top: 1em;
                    margin-bottom: 1em;
                    color: #162447;
                }
                .ProseMirror p {
                    margin-bottom: 1em;
                    color: #364440;
                }
                .ProseMirror blockquote {
                    border-left: 3px solid #ccc;
                    padding-left: 1em;
                    margin-left: 0;
                    font-style: italic;
                    color: #364440;
                }
            `}</style>
        </ContentSection>
    );
}
