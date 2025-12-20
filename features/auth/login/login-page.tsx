'use client';

import { Login } from '@/api/client/method/auth/login';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type LoginFormValues = {
  uname: string;
  password: string;
  rememberme: boolean;
};

export function LoginPage() {
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      uname: '',
      password: '',
      rememberme: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);
    try {
      const redirect = searchParams?.get('redirect') || undefined;
      const response = await Login({ ...values, redirect }).send();
      const redirectUrl = (response as { url?: string })?.url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      throw new Error('登录失败，请检查用户名或密码');
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : '登录失败，请稍后重试';
      setSubmitError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <Image
          src="/nav-logo-small_light.png"
          alt="ZYZOJ Logo"
          width={160}
          height={44}
          priority
        />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>登录</CardTitle>
            <CardDescription>登录后即可开始使用 ZYZOJ。</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Field>
                <FieldLabel htmlFor="uname">用户名</FieldLabel>
                <FieldContent>
                  <Input
                    id="uname"
                    type="text"
                    autoComplete="username"
                    placeholder="请输入用户名"
                    aria-invalid={!!errors.uname}
                    disabled={isSubmitting}
                    {...register('uname', { required: '请输入用户名' })}
                  />
                  <FieldError errors={[errors.uname]} />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">密码</FieldLabel>
                <FieldContent>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="请输入密码"
                    aria-invalid={!!errors.password}
                    disabled={isSubmitting}
                    {...register('password', { required: '请输入密码' })}
                  />
                  <FieldError errors={[errors.password]} />
                </FieldContent>
              </Field>

              <div className="flex items-center justify-between">
                <Controller
                  control={control}
                  name="rememberme"
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rememberme"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="rememberme" className="text-sm">
                        记住我
                      </Label>
                    </div>
                  )}
                />
              </div>

              {submitError && (
                <p className="text-destructive text-sm">{submitError}</p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? '登录中...' : '登录'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
