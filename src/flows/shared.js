module.exports.runShared = async (toolbox, config) =>  {
  const answers = await askQuestions(toolbox)
  await initCircleCI(toolbox, config)
  return answers
}

const askQuestions = async ({ prompt }) => {
  // text input
  const askOrganization = {
    type: 'input',
    name: 'org',
    message: 'Your github organization?'
  }
  const askProject = {
    type: 'input',
    name: 'project',
    message: 'Your github project name?'
  }
  const askApiToken = {
    type: 'input',
    name: 'apiToken',
    message: 'Your CircleCI API token?'
  }
  // ask a series of questions
  const questions = [askOrganization, askProject, askApiToken]
  return prompt.ask(questions)
}

const initCircleCI = async ({ template, prompt, print, http, android }, { org, project, apiToken, jsonPath }) => {
  await template.generate({
    template: 'circleci/config.yml',
    target: '.circleci/config.yml',
    props: {}
  })

  const api = http.create({
    baseURL: 'https://circleci.com/api/v1.1/'
  })

  const { status } = await api.post(
    `project/github/${org}/${project}/follow?circle-token=${apiToken}`
  )

}