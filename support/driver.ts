import { Page } from "@playwright/test";
import { Logger } from "winston";

export const driver = {
  page: undefined as unknown as Page,
  logger: undefined as unknown as Logger,
};
