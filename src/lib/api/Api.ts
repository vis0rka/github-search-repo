import { Octokit } from 'octokit'
import { GithubApi } from './GithubApi'

class Api {
	readonly client = new Octokit()

	readonly github = new GithubApi(this.client)
}

export const api = new Api()
