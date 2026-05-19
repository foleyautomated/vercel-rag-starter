"use client";
import { useChat } from "@ai-sdk/react";
//import { defaultChatStoreOptions } from "ai";
export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, status, error } =
    useChat({
      api: "/api/chat",
    });

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      <div>Status: {status}</div>
      {status === "error" && (
        <div className="text-red-500">
          <div>Error: {error?.message}</div>
          <div>Stack: {error?.stack}</div>
          <div>Name: {error?.name}</div>
        </div>
      )}

      {/* <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <p>
                {m.content.length > 0 ? (
                  m.content
                ) : (
                  <span className="font-light italic">
                    {"calling tool: " + m?.toolInvocations?.[0].toolName}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                return <span key={index}>{part.text}</span>;

              // other cases can handle images, tool calls, etc
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={status !== "ready"}
        />
      </form>
    </div>
  );
}
