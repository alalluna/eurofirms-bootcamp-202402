# Joserra app (name TBD)

## Intro

se conecta a una api externa para generar los eventos
....
app that will get the events provided by BCP and people can bet on them in order the get a currency.
users can bet on an event before 10 minutes prior to the event's start.
The app will check at the end of the day which events are finished and the payoff the winners with a currency


![](https://media.giphy.com/media/l2JdUxtzA6sueiBws/giphy.gif?cid=ecf05e47ugdhcxdnym5zuekpnqoc146ik356ce1mvppkctkj&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- search events
- view event
- place bet
- remove bet
- update bet
- list ongoing bets
- list closed bets
- view wallet
- add credit to wallet

### UI Design


https://www.figma.com/file/gtyR9PFYvfgJNzlr6GLXni/Register?type=design&node-id=0%3A1&mode=design&t=6d1895YbXlem0hjX-1

## Technical Description

### Technologies

- JavaScript
- React
- Node
- Express
- Mongo

## Modules

- API (server)
- App (client)
- com (common assets)
- doc (documentation)

### Data Model

User
- id (auto)
- username (string,required, unique)
- email (string, required,unique)
- password (string, required)
- birthdate (date, required)
- wallet (number, min: 0)

Player 
- id
- name (string, required, unique)

Event
- id (auto)
- code (String, required, unique)
- name (string, required)
- description (string, required)
- players (array of Player.id, required)
- winner (Player.id) 
- startDate (date, required)
- endDate (date, required)
- status (string, enum: open|closed)

Bet
- id(auto)
- event(Event.id, required)
- player (Player.id, required)
- user (User.id, requried)
- amount (number,required,min:1)
