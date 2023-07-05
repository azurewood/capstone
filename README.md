# Capstone Project

## Introduction
This project is intended to present at IOD/AUT computer software engineering course. It utilizes contemporary web application development technologies to demonstrate knowledge learnt from the course. The main of this project should be responsive, eye appealing and full featured to the end users/stakeholders. 

In Otago region and across all New Zealand, a lot of outdoor workers are battling with harsh weather conditions, espacially in winter season. The ability of easily getting access to weather information is a daily routine for every forecast provider. However, many free online resources are not free or not intuitive to use, so we are obsessed with creating a weather forecast service for New Zealand users by using the best online resources.

## Objectives
- Express / Fastify backend to provide data CRUD operations.
- Next.js frontend with ReactJS / typescript to cater a full featured UI.
- Authentication for admin users to manage backend data.

## Technologies / Tools
- Fastify / MongoDB
- NextJS / React / Typescript
- TailwindCSS
- GitHub

```mermaid
gantt
dateFormat  YYYY-MM-DD
title Phases of The Project
excludes weekdays

section Documentation
Readme            :active,     des1,2023-07-05,2023-07-25

section Backend
Express            :done,    des1, 2023-07-05,1d
Fastify               :active,  des2, 2023-07-09, 3d
MongoDB               :         des3, after des2, 5d
Auth               :         des4, after des3, 5d

section Frontend
NextJS            :active,    des1, 2023-07-05,2023-07-25
Canvas with React               :active,  des2, 2023-07-09, 5d 
User Interaction               :         des3, after des2, 5d
Admin Managment               :         des4, after des3, 5d

```

```mermaid
flowchart TD
    A[The User] -->|go website| B(explore Homepage)
    B --> C{normal user}
    C -->D[add cities]
    C -->E[remove cities]
    C -->F[check weather]

    B --> H{admin}
    H -->I[login/logout]
    H -->J[add locations]
    H -->K[delete locations]
```