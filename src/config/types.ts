// ========== Types
// import all modules
import { Request, Response } from 'express'

export type ResponseType = <T>(req: Request, res: Response, status: number, success: boolean, message: string, results?: T[] | T, totalData?: number, totalPage?: number) => Response
