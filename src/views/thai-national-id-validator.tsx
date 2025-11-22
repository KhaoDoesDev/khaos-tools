import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle } from "lucide-react"
import { Seo } from "@/seo"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ThaiIDValidator() {
  const [idNumber, setIdNumber] = useState("")
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    message: string
  } | null>(null)

  const validateThaiID = (id: string): { isValid: boolean; message: string } => {
    const cleanID = id.replace(/[\s-]/g, "")

    if (!/^\d{13}$/.test(cleanID)) {
      return {
        isValid: false,
        message: "Thai National ID must be exactly 13 digits",
      }
    }

    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += Number.parseInt(cleanID.charAt(i)) * (13 - i)
    }

    const remainder = sum % 11
    const checkDigit = (11 - remainder) % 10

    const lastDigit = Number.parseInt(cleanID.charAt(12))

    if (checkDigit === lastDigit) {
      return {
        isValid: true,
        message: "Valid Thai National ID",
      }
    } else {
      return {
        isValid: false,
        message: "Invalid Thai National ID | checksum failed",
      }
    }
  }

  const formatThaiID = (value: string): string => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 1) return cleaned
    if (cleaned.length <= 5) return `${cleaned.slice(0, 1)}-${cleaned.slice(1)}`
    if (cleaned.length <= 10) return `${cleaned.slice(0, 1)}-${cleaned.slice(1, 5)}-${cleaned.slice(5)}`
    if (cleaned.length <= 12)
      return `${cleaned.slice(0, 1)}-${cleaned.slice(1, 5)}-${cleaned.slice(5, 10)}-${cleaned.slice(10)}`
    return `${cleaned.slice(0, 1)}-${cleaned.slice(1, 5)}-${cleaned.slice(5, 10)}-${cleaned.slice(10, 12)}-${cleaned.slice(12, 13)}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleaned = value.replace(/\D/g, "").slice(0, 13)
    const formatted = formatThaiID(cleaned)
    setIdNumber(formatted)

    if (cleaned.length === 13) {
      const result = validateThaiID(cleaned)
      setValidationResult(result)
    } else {
      setValidationResult(null)
    }
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 mb-12">
      <Seo title="Khao's Tools" slug="Thai National ID Validator" description="Verify Thai national identification numbers using the official checksum algorithm." />
      <h1 className="text-3xl font-extrabold text-center mb-3">
        Thai National ID Validator
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Verify Thai national identification numbers using the official checksum algorithm.
      </p>

      <div className="backdrop-blur-md border rounded-2xl p-6 shadow-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="id-input" className="text-sm font-medium">
            National ID Number
          </Label>
          <Input
            id="id-input"
            type="text"
            placeholder="1-2345-67890-12-3"
            value={idNumber}
            onChange={handleInputChange}
            className="text-lg tracking-wider font-mono"
            maxLength={17}
          />
          <p className="text-xs text-muted-foreground">Enter 13-digit Thai national ID number</p>
        </div>
        
        {validationResult && (
          <Alert variant={validationResult.isValid ? "default" : "destructive"}>
            {validationResult.isValid ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <AlertTitle>{validationResult.isValid ? "Valid ID" : "Invalid ID"}</AlertTitle>
            <AlertDescription>
              {validationResult.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          This validator uses the official Thai national ID checksum algorithm
        </p>
      </div>
    </main>
  )
}
