import React, { createRef } from 'react'
import rrwebPlayer from 'rrweb-player'
import { useEffectOnce } from 'react-use'

interface Props {
  events: ISessionEvent[]
}

export function SessionPlayer({ events }: Props) {
  const wrapper = createRef<HTMLDivElement>()

  useEffectOnce(() => {
    const normalized = events.flatMap(item => {
      return item.events.map(event => ({
        ...event,
        data: JSON.parse(event.data)
      }))
    })

    // eslint-disable-next-line
    new rrwebPlayer({
      target: wrapper.current,
      data: {
        events: normalized,
        autoPlay: true
      }
    })
  })

  return <div ref={wrapper} />
}
