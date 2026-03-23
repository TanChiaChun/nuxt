import * as readline from 'node:readline/promises'
import { exit, stdin, stdout } from 'node:process'
import { auth } from '#server/utils/auth'

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout })
  const name = await rl.question('Enter name: ')
  const email = await rl.question('Enter email: ')
  const password = await rl.question('Enter password: ')
  rl.close()
  
  try {
    console.log('Creating user')
    await auth.api.signUpEmail({
      body: { name, email, password },
    })
    console.log('User created successfully')
    exit(0)
  } catch (e) {
    console.error(e)
    exit(1)
  }
}

await main()
