import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorThrower(
  { error }: { error: string }
) {
  return <Alert>
    <AlertCircle className="h-4 w-4 text-destructive" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
    </AlertDescription>
  </Alert>
}