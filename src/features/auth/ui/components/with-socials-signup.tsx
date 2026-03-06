import { GithubIcon } from '#/components/icons/github'
import { GoogleIcon } from '#/components/icons/google'
import { Button } from '#/components/ui/button'

export function WithSocialsSignup() {
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full gap-2" type="button">
        <GithubIcon className="size-4" />
        Continue with GitHub
      </Button>
      <Button variant="outline" className="w-full gap-2" type="button">
        <GoogleIcon className="size-4" />
        Continue with Google
      </Button>
    </div>
  )
}
