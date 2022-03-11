// ========== Response
// import all modules
import { Request, Response } from 'express'
import { ResponseType } from '../config/types'
import config from '../config'

const response: ResponseType = <T>(req: Request, res: Response, status: number, message: string, results?: T[] | T, totalData?: number, totalPage?: number): Response => {
	if (!results && (!req.query.page || !totalPage)) {
		return res.status(status).json({
			status,
			message
		})
	} else if (results && Array.isArray(results) && totalData && totalPage) {
		return res.status(status).json({
			status,
			message,
			results,
			pageInfo: {
				totalData: Number(totalData),
				totalPage: Number(totalPage),
				page: Number(req.query.page),
				previousLink: (req.query.page && Number(req.query.page) > 1) ? `${config.apiUrl}${req.path}?${Object.keys(req.query).map((item, index) => `${item === 'page' ? `page=${Number(Object.values(req.query)[index]) - 1}` : `${item}=${Object.values(req.query)[index]}`}`).join('&')}` : null,
				nextLink: (req.query.page && Number(req.query.page) < Number(totalPage)) ? `${config.apiUrl}${req.path}?${Object.keys(req.query).map((item, index) => `${item === 'page' ? `page=${Number(Object.values(req.query)[index]) + 1}` : `${item}=${Object.values(req.query)[index]}`}`).join('&')}` : null
			}
		})
	} else {
		return res.status(status).json({
			status,
			message,
			results
		})
	}
}

export default response
