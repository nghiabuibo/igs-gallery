'use strict';


/**
 * A set of functions called "actions" for `submission-register`
*/

import crypto from "crypto"
import getRoleIDByName from "../../../utils/getRoleIDByName"
import getRandomCode from "../../../utils/getRandomCode"

import fs from "fs"
import _ from "lodash"

export default async (ctx) => {
  try {
    const entries = ctx.request.body

    // create new submission
    const submissionCode = getRandomCode()
    const submission = await strapi.entityService.create('api::submission.submission', {
      data: {
        code: submissionCode,
        status: 'pending',
        publishedAt: new Date().toISOString()
      }
    })
    if (!submission || !submission.id) return ctx.badRequest(`Registration failed!`)

    // setup email template
    const emailHtml = fs.readFileSync('public/email/templates/register.html', 'utf-8')
    const submitUrl = process.env.APP_URL ? process.env.APP_URL + `/upload/${submission.code}` : `http://localhost:3000/upload/${submission.code}`
    const emailParams = { submitUrl }

    const emailTemplate = {
      subject: `IGS'S GOT TALENT | XÁC NHẬN ĐĂNG KÝ THÀNH CÔNG - HƯỚNG DẪN NỘP BÀI DỰ THI`,
      text: `Ivy Global School thanks you and congratulations for SUCCESSFULLY REGISTERING for IGS's Got Talent 2023. Contestants or team leaders should submit their works on the contest system of the Organizing Committee here: <%= emailParams.submitUrl %>. Deadline for submission: 22:00, Friday, December 1, 2023`,
      html: emailHtml,
    };
    
    // get sending email config
    const registerSettings = await strapi.entityService.findMany('api::register-setting.register-setting')

    // create new users
    const defaultRoleID = await getRoleIDByName('authenticated')
    for (let i in entries) {
      const entry = entries[i]
      if (!entry.username) entry.username = crypto.randomUUID()
      entry.role = defaultRoleID
      entry.provider = 'local'
      entry.submission = [submission.id]

      const user = await strapi.entityService.create('plugin::users-permissions.user', {
        data: entry
      })

      if (!user || !user.id) return ctx.badRequest(`Registration failed at user ${i + 1}!`)

      // send email
      if (!registerSettings?.registerEmail) continue

      try {
        strapi.plugins['email'].services.email.sendTemplatedEmail(
          {
            to: user.email,
            bcc: process.env.AWS_SES_FROM
          },
          emailTemplate,
          {
            emailParams: _.pick(emailParams, ['submitUrl'])
          }
        )
      } catch (err) {
        console.log(`Error sending email ${user.email} at ${new Date()} ::: `, err)
      }

    }

    const message = ['Registration successful!']
    if (registerSettings?.registerEmail) message.push('Please check your registered email inbox for your submission code.')

    return ctx.send({
      code: submissionCode,
      message: message.join(' ')
    })
  } catch (err) {
    ctx.body = err;
  }
};
