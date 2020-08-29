/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

export { server };
