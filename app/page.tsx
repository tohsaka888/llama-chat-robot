"use client";
import styles from "./page.module.css";
import { useChat } from "ai/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Button, Flex, Form, Input } from "antd";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });
  return (
    <main>
      <div style={{ width: "100vw", display: "grid", paddingBottom: "64px" }}>
        {messages.map((m) => (
          <Flex
            key={m.id}
            style={{
              justifySelf: m.role === "user" ? "right" : "left",
              maxWidth: "45%",
            }}
          >
            {m.role === "user" ? "User: " : "AI: "}
            <MarkdownPreview
              key={m.id}
              source={m.content}
              style={{
                padding: "8px",
                margin: "0px 8px",
                borderRadius: "8px",
                border: "1px solid #cecece",
              }}
            />
          </Flex>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          padding: "16px",
          width: "100vw",
          background: "#f9f9f9",
        }}
      >
        <Form
          onSubmitCapture={handleSubmit}
          layout={"inline"}
          style={{ width: "100%" }}
        >
          <Form.Item style={{ flex: 1 }}>
            <Input value={input} onChange={handleInputChange} />
          </Form.Item>
          <Button htmlType="submit">Send</Button>
        </Form>
      </div>
    </main>
  );
}
