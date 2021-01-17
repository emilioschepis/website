---
title: Learning the Go programming language by creating the Amanuense bot
description: How I created a voice-transcribing Telegram bot using Google's Speech-to-Text technology and Golang.
tags: Telegram, Speech-to-Text, Golang, Go, Bot, Automation
date: "2020-07-24T00:00:00.000Z"
---
## Introduction

Recently I've felt the urge to learn a new programming language.

I believe that learning a new programming language is a great opportunity to see
common problems in a different light, solving them in new ways and learning
something that can then be applied to languages you already know.

The idea itself comes from
[The Pragmatic Programmer](https://pragprog.com/titles/tpp20/) book and has been
discussed by many different programmers and authors.

## The Go programming language

After reading about different languages for a while I decided to learn the
basics of the [Go](https://golang.org) language.

What inspired me to try this language is its philosophy that favours simplicity
over (perceived) completeness, and its concurrency model.

In Go there almost always is only one way of achieving the desired behavior, and
that alleviates the cognitive load of deciding how to implement a specific
functionality.

This felt a bit weird at first, especially as I always try to write code in a
functional style. Using a plain old `for-loop` instead of a `map` of `for-each`
took some time to get used to.

This, however, is perfectly in line with their philosophy: I can now read any
program written in Go and know how and why each portion of code is written the
way it is.

Another fundamental difference is the absence of exceptions. Code that can fail
usually returns two values (the result and the error). Using the word "values"
is not accidental: errors in Golang are simply values. There is no throwing or
catching.

I believe this error handling method will still take some time for me to get
used to. Fortunately, I've used a similar structure in the past: Swift's
`Result` type and, before that, handling a tuple of values as the return type of
a closure.

## Learning the basics

When learning a new programming language I usually follow basic tutorials until
I feel confident enough to write code from scratch, and at the same time I try 
to watch talks and demos about the language to see how expert programmers handle
common and uncommon scenarios.

For the first few days I followed Jon Calhoun's
[Gophercises](https://gophercises.com), and I absolutely recommend them. It is
difficult to come up with so many different projects on our own, and the
Gophercises offer very practical advice on how to handle scenarios that come up
often while developing a Go program. 

After going through
[the first six exercises](https://github.com/emilioschepis/gophercises) of the
course I felt ready to write my own program.

## Creating the bot

For this project I decided that I wanted to build something using Google's
serverless Cloud Functions.

I found out about Google's Speech-to-Text technology, and I knew what I wanted
to use it for: a Telegram bot that could transcribe voice messages so that I
could read them without interrupting whatever I was listening to.

The bot's name is Amanuense, which is Italian for Amanuensis or Scribe.

The first step to create a Go project is to initialize a module. This is useful
even if you're not publishing your code as explained in
[How to Write Go Code](https://golang.org/doc/code.html).

Doing so creates the `go.mod` and `go.sum`. If you're familiar with NodeJS,
you can think of these files as `package.json` and its lockfile.

Then, I had to add the external dependencies through the `go get` command:
`cloud.google.com/go` and `github.com/go-telegram-bot-api/telegram-bot-api`.

Once I finished writing the code for the bot, I simply set up a Telegram webhook
to call my Cloud Function with data about the message.

## My experience

My experience with Go has been very positive. I have not had the chance to try
concurrency-related features, but with this simple project I've been able to
get used to the language's basic features and great tooling.

I've particularly enjoyed `gofmt`, the standard formatter that is automatically
applied to every Go program, further reinforcing the simplicity of reading
someone else's code.

Other languages' formatters are not as opinionated and are often built by
third-parties, thus lowering consistency across different codebases.

## Some code

```go
func downloadVoiceMessage(bot *tgbotapi.BotAPI, voice *tgbotapi.Voice) ([]byte, error) {
	url, err := bot.GetFileDirectURL(voice.FileID)
	if err != nil {
		log.Printf("could not get voice file url: %v\n", err)
		return nil, err
	}

	resp, err := http.Get(url)
	if err != nil {
		log.Printf("could not download voice file: %v\n", err)
		return nil, err
	}

	return ioutil.ReadAll(resp.Body)
}
```

In this snippet you can see the idiomatic way of handling errors, both as the
producer (L1, L5) and the consumer (L2, L8).

---

```go
func transcribeVoice(data []byte) (*transcription, error) {
	// ...

	sr := extractSampleRate(data)

	sc, err := speech.NewClient(ctx)
	if err != nil {
		log.Printf("could not instantiate speech client: %v\n", err)
		return nil, err
	}
	defer sc.Close()
	
	// ...
}
```

In this snippet you can see how you can use methods exported by external
dependencies. Methods are exported if their name starts with a capital letter.

The `defer` statement ensures that the speech client gets correctly closed
regardless of how / where the function returns.

## Next steps

I plan on continuing to learn Go and on using it in some of my side projects.
The next step I want to take is to get familiar with Go's testing suite.

In particular, I'd like to explore the concept of
[table-driven tests](https://github.com/golang/go/wiki/TableDrivenTests).

## Conclusion

This has been my first experience with the Go programming language.

I especially like the large collection of first-party tools and the 
"less is more" philosophy that seems to drive the language design since its
origins.

If you want to take a look at the Amanuense code you can find it
[here](https://github.com/emilioschepis/amanuense-go).

If you want to use the bot and you speak Italian you can find it
[here](https://t.me/amanuensebot). Go's Speech-to-Text library still does not
support multiple languages, but I'll make sure to update the bot once that
feature is available.

If you are interested in the language I recommend reading the docs and checking
out some online resources like the talks on the
[Gopher Academy](https://www.youtube.com/c/GopherAcademy/videos), the videos on
[justforfunc](https://www.youtube.com/channel/UC_BzFbxG2za3bp5NRRRXJSw) and
[TutorialEdge](https://www.youtube.com/channel/UCwFl9Y49sWChrddQTD9QhRA), and
the [Gophercises](https://gophercises.com).

**Thank you for reading!**
