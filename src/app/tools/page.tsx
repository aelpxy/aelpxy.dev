import Content from '@/components/content'
import AesEncryption from '@/components/tools/aes-encryption'
import BaseConverter from '@/components/tools/base-converter'
import ColorConverter from '@/components/tools/color-converter'
import DiffChecker from '@/components/tools/diff-checker'
import EncryptionTool from '@/components/tools/encryption-tool'
import HashGenerator from '@/components/tools/hash-generator'
import JsonFormatter from '@/components/tools/json-formatter'
import JwtDecoder from '@/components/tools/jwt-decoder'
import PasswordGenerator from '@/components/tools/password-generator'
import RegexTester from '@/components/tools/regex-tester'
import SshKeyGenerator from '@/components/tools/ssh-key-generator'
import TimestampConverter from '@/components/tools/timestamp-converter'
import TomlYamlFormatter from '@/components/tools/toml-yaml-formatter'
import UrlEncoder from '@/components/tools/url-encoder'
import UuidGenerator from '@/components/tools/uuid-generator'
import { baseUrl } from '@/lib/sitemap'

export const metadata = {
  title: 'aelpxy - tools',
  description: 'dev utilities',
  openGraph: {
    title: 'aelpxy',
    description: 'tools',
    images: `${baseUrl}/open-graph?type=blog&title=${'dev utilities'}&path=${'~/tools'}&date=${'aelpxy.dev'}`,
  },
}

export default function Page() {
  return (
    <main>
      <Content title='./tools'>
        <p className='text-base py-4 text-neutral-400'>
          collection of useful utilities.
        </p>

        <section className='py-6'>
          <h2 className='text-xl font-medium text-neutral-200 mb-4'>
            generators
          </h2>
          <div className='flex flex-col gap-y-6'>
            <UuidGenerator />
            <PasswordGenerator />
          </div>
        </section>

        <section className='py-6'>
          <h2 className='text-xl font-medium text-neutral-200 mb-4'>
            security & crypto
          </h2>
          <div className='flex flex-col gap-y-6'>
            <AesEncryption />
            <HashGenerator />
            <SshKeyGenerator />
          </div>
        </section>

        <section className='py-6'>
          <h2 className='text-xl font-medium text-neutral-200 mb-4'>
            encoders & converters
          </h2>
          <div className='flex flex-col gap-y-6'>
            <BaseConverter />
            <EncryptionTool />
            <UrlEncoder />
          </div>
        </section>

        <section className='py-6'>
          <h2 className='text-xl font-medium text-neutral-200 mb-4'>
            formatters & parsers
          </h2>
          <div className='flex flex-col gap-y-6'>
            <JsonFormatter />
            <TomlYamlFormatter />
          </div>
        </section>

        <section className='py-6'>
          <h2 className='text-xl font-medium text-neutral-200 mb-4'>
            validators & testers
          </h2>
          <div className='flex flex-col gap-y-6'>
            <RegexTester />
            <JwtDecoder />
            <DiffChecker />
          </div>
        </section>

        <section className='py-6'>
          <h2 className='text-xl font-medium text-neutral-200 mb-4'>
            utilities
          </h2>
          <div className='flex flex-col gap-y-6'>
            <ColorConverter />
            <TimestampConverter />
          </div>
        </section>
      </Content>
    </main>
  )
}
