// Output: commits<string> | null
module.exports = async ({ diff_commits, core }) => {
	// TODO 转义所有的特殊符号
	try {
		const changes = diff_commits
			.replace(/\"/g, "'")
			.split('\n')
			.filter(
				(m) =>
					!/^(Merge pull request|Merge branch|Merge remote-tracking)/.test(m) && !!m
			)
			.map((m) => `- ${m}`)
			.join('\n');
		const commits = '# All Changes\n' + changes;

		core.setOutput('commits', commits)
	} catch (error) {
		core.error(error.message)
	}
}
