import { Event } from "../types";
import React from "react";

export const EVENT_DATA: Event[] = [
  {
    id: "1",
    title: "IBLM Legal Summit 2024: The Future of Virtual Assets",
    date: "November 15, 2024",
    time: "09:00 AM - 05:00 PM",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1544531696-dd9e31a98074?auto=format&fit=crop&q=80&w=800",
    location: "Convention Center, Los Angeles",
    contactEmail: "events@iblm.law",
    externalLink: "#",
    description: (
      <>
        <p className="lead">
          Join over 500 industry leaders, general counsels, and studio heads for
          a day of intensive workshops and networking at the forefront of
          digital entertainment law.
        </p>
        <h3>Agenda Highlights</h3>
        <ul>
          <li>
            <strong>09:00 AM</strong> - Keynote: The State of AI Regulation in
            Gaming
          </li>
          <li>
            <strong>11:00 AM</strong> - Panel: Cross-Border Data Privacy in 2025
          </li>
          <li>
            <strong>02:00 PM</strong> - Workshop: Structuring Series A for Game
            Studios
          </li>
        </ul>
        <h3>Why Attend?</h3>
        <p>
          The regulatory landscape is shifting beneath our feet. This summit is
          designed to equip you with actionable strategies to protect your IP
          and navigate the complexities of international compliance.
        </p>
      </>
    ),
  },
  {
    id: "2",
    title: "Game Developers Conference Mixer",
    date: "March 20, 2024",
    time: "07:00 PM - 11:00 PM",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    location: "The W Hotel, San Francisco",
    contactEmail: "rsvp@iblm.law",
    description: (
      <>
        <p>
          IBLM Law Group invites our clients and partners to an exclusive evening
          of cocktails and conversation during GDC. Unwind after the conference
          and connect with fellow creators and innovators.
        </p>
        <p>
          This is a private event. Please RSVP to secure your spot on the guest
          list.
        </p>
      </>
    ),
  },
  {
    id: "3",
    title: "Digital Rights & Creator Economy Workshop",
    date: "August 10, 2023",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800",
    location: "IBLM HQ, Los Angeles",
    description: (
      <>
        <p>
          A hands-on workshop designed specifically for top-tier content
          creators and their management teams. We will dive deep into MCN
          contracts, brand deal negotiation, and protecting your personal brand.
        </p>
        <p>
          Attendees will leave with a personalized &quot;Legal Health
          Check&quot; roadmap.
        </p>
      </>
    ),
  },
  {
    id: "4",
    title: "European eSports Regulation Roundtable",
    date: "May 05, 2023",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3dab?auto=format&fit=crop&q=80&w=800",
    location: "London, UK (and Virtual)",
    description: (
      <>
        <p>
          With the UK and EU taking divergent paths on loot box regulation and
          player rights, this roundtable brings together policy experts and team
          owners to discuss the future of the European competitive scene.
        </p>
      </>
    ),
  },
];
