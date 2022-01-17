import React, { memo, useEffect, useReducer, useState } from 'react'
import { useCssAndCx } from 'tss-react'
import { pathJoin } from 'keycloakify/lib/tools/pathJoin'
import { assert } from 'tsafe/assert'
import {
  useKcLanguageTag,
  useKcMessage,
  getBestMatchAmongKcLanguageTag,
  getKcLanguageTagLabel,
  KcLanguageTag,
} from 'keycloakify'
import { headInsert } from 'keycloakify/lib/tools/headInsert'
import { useCallbackFactory, useConstCallback } from 'powerhooks'
import { getStatus, WARNING } from '../../utils/status'
import Logo from '../../assets/logo-bk.png'
import { Language } from '@mui/icons-material'

import type { KcTemplateProps, KcContextBase } from 'keycloakify'
import type { ReactNode } from 'react'
import { Alert, Box, Button, IconButton, Container, Menu, MenuItem, Stack } from '@mui/material'

export type TemplateProps = {
  displayInfo?: boolean
  displayMessage?: boolean
  displayRequiredFields?: boolean
  displayWide?: boolean
  showAnotherWayIfPresent?: boolean
  headerNode: ReactNode
  showUsernameNode?: ReactNode
  formNode: ReactNode
  infoNode?: ReactNode
  doFetchDefaultThemeResources: boolean,
} & { kcContext: KcContextBase } & KcTemplateProps

export const Template = memo((props: TemplateProps) => {
  const { cx } = useCssAndCx()
  const { msg } = useKcMessage()
  const { kcLanguageTag, setKcLanguageTag } = useKcLanguageTag()
  const {
    displayInfo = false,
    displayMessage = true,
    showAnotherWayIfPresent = true,
    formNode,
    infoNode = null,
    kcContext,
    doFetchDefaultThemeResources,
  } = props
  const { realm, locale } = kcContext
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const onChangeLanguageClickFactory = useCallbackFactory(([languageTag]: [KcLanguageTag]) => 
    setKcLanguageTag(languageTag)
  )
  const onTryAnotherWayClick = useConstCallback(
    () => (document.forms['kc-select-try-another-way-form' as never].submit(), false),
  )

  // Language
  useEffect(() => {
    if (!realm.internationalizationEnabled) return

    assert(locale !== undefined)

    const bestMatchLanguageTag = getBestMatchAmongKcLanguageTag(locale.current)
    if (bestMatchLanguageTag === kcLanguageTag) return

    console.log(`Selected lang is ${bestMatchLanguageTag}`)

    window.location.href = locale.supported.find(({ languageTag }) => languageTag === kcLanguageTag)!.url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kcLanguageTag, locale, realm.internationalizationEnabled])

  // ExtraCSS
  const [isExtraCssLoaded, setExtraCssLoaded] = useReducer(() => true, false)

  useEffect(() => {
    if (!doFetchDefaultThemeResources) {
      setExtraCssLoaded()
      return
    }

    let isUnmounted = false
    const cleanups: (() => void)[] = []
    const toArr = (x: string | readonly string[] | undefined) => (typeof x === 'string' ? x.split(' ') : x ?? [])

    Promise.all(
      [
        ...toArr(props.stylesCommon).map((relativePath) => pathJoin(kcContext.url.resourcesCommonPath, relativePath)),
        ...toArr(props.styles).map((relativePath) => pathJoin(kcContext.url.resourcesPath, relativePath)),
      ].map((href) =>
        headInsert({
          type: 'css',
          href,
          position: 'prepend',
        }),
      ),
    ).then(() => {
      if (isUnmounted) {
        return
      }

      setExtraCssLoaded()
    })

    toArr(props.scripts).forEach((relativePath) =>
      headInsert({
        type: 'javascript',
        src: pathJoin(kcContext.url.resourcesPath, relativePath),
      }),
    )

    if (props.kcHtmlClass !== undefined) {
      const htmlClassList = document.getElementsByTagName('html')[0].classList
      const tokens = cx(props.kcHtmlClass).split(' ')

      htmlClassList.add(...tokens)
      cleanups.push(() => htmlClassList.remove(...tokens))
    }

    return () => {
      isUnmounted = true
      cleanups.forEach((f) => f())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.kcHtmlClass])

  if (!isExtraCssLoaded) return null

  return (
    <Container maxWidth='xs' sx={{paddingY: 4}}>
      <Stack spacing={2}>
        {/* Logo */}
        <Box my={4} display={'flex'} justifyContent={'center'}>
          <img src={Logo} alt='logo' width='50%' />
        </Box>

        {/* displayMessage */}
        <Box>
          {displayMessage &&
            !!kcContext.message &&
            kcContext.message.type !== WARNING &&
            !kcContext.isAppInitiatedAction && (
              <Alert 
                severity={getStatus(kcContext.message.type)}
              >
                {kcContext.message.summary.replace('<br>', ' ')}
              </Alert>)}
        </Box>

        {/* formNode */}
        {formNode}

        {/* try-another-way */}
        {kcContext.auth?.showTryAnotherWayLink && showAnotherWayIfPresent && (
          <Box
            id='kc-select-try-another-way-form'
            component='form'
            method='post'
            action={kcContext.url.loginAction}
          >
            <input name='tryAnotherWay' type='hidden' value='on' />  
            <Button 
              id='try-another-way'
              variant='contained'
              fullWidth
              onClick={onTryAnotherWayClick}
            >
              {msg('doTryAnotherWay')}
            </Button>
          </Box>)}
        
        {/* infoNode */}
        {displayInfo && infoNode}

        {/* Locale */}
        {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
          <Box display='flex' justifyContent='end'>
            <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget)}}>
              <Language />
            </IconButton>
            <Menu 
              open={open}
              anchorEl={anchorEl}
              onClose={() => {setAnchorEl(null)}}
            >
              {locale?.supported.map(({ languageTag }) => (
                <MenuItem key={languageTag} onClick={onChangeLanguageClickFactory(languageTag)}>{ getKcLanguageTagLabel(languageTag) }</MenuItem>
              ))}
            </Menu>
          </Box>)}
      </Stack>
    </Container>
  )
})