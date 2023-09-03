"use client";
import React from "react";
import { Affix, Button } from "antd";

const MyComponent = (props: { message: string }) => {
  return (
    <div>

      <h1>こんにちは、Next.js!</h1>
      <p>{props.message}</p>
      <Button type="primary">Button</Button>
    </div>
  );
};

export default MyComponent;
