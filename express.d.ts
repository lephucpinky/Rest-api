import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>
    }
  }
}
await new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve(true);
  }, 300);
});