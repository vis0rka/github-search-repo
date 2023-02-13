import { Octokit } from 'octokit'

export abstract class ApiBase {
	constructor(protected client: Octokit) {}
}
