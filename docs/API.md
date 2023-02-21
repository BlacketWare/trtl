# API
All functions in trtl related to the API.

## get
Arguments:

```
url    : string - the request URL
opts   : Object - the request headers/other options
```

Create a general get request.

## post
Arguments:

```
url    : string - the request URL
body   : Object - the request body
opts   : Object - the request headers/other options
```

Create a general post request.

<br>
<br>

## badges
Arguments: none<br>
Get the instance's current badges.

##### Defined in [api/badges.md](https://github.com/BlacketWare/Docs/tree/master/api/badges.md)

## banners
Arguments: none<br>
Get the instance's current banners.

##### Defined in [api/banners.md](https://github.com/BlacketWare/Docs/tree/master/api/banners.md)

## buyBazaar
Arguments:

```
id    : string - the item's ID.
```

Buy an item from the bazaar.<br>

##### Defined in [api/bazaar.md](https://github.com/BlacketWare/Docs/tree/master/api/bazaar.md)

## blooks
Arguments: none<br>
Get the instance's current blooks.

##### Defined in [api/blooks.md](https://github.com/BlacketWare/Docs/tree/master/api/blooks.md)

## booster
Arguments: none<br>
Get the global rate booster.

##### Defined in [api/booster.md](https://github.com/BlacketWare/Docs/tree/master/api/booster.md)

## changeColor
Arguments:

```
name    : string - the new color
```

Change the bot's name color, if the bot has plus.<br>

##### Defined in [api/change.md](https://github.com/BlacketWare/Docs/tree/master/api/change.md)

## claim
Arguments: none<br>
Claim the account's daily rewards.

##### Defined in [api/claim.md](https://github.com/BlacketWare/Docs/tree/master/api/claim.md)

## config
Arguments: none<br>
Get the instance's current config.

##### Defined in [api/config.md](https://github.com/BlacketWare/Docs/tree/master/api/config.md)

## emojis
Arguments: none<br>
Get the instance's chat emojis.

##### Defined in [api/emojis.md](https://github.com/BlacketWare/Docs/tree/master/api/emojis.md)

## getBazaar
Arguments:

```
item    : string - the item name, leave blank for recently posted offers
```

Fetch bazaar results for an item, or just recent offers.<br>

##### Defined in [api/bazaar.md](https://github.com/BlacketWare/Docs/tree/master/api/bazaar.md)

## leaderboard
Arguments: none<br>
Get the instance's current leaderboard.

##### Defined in [api/config.md](https://github.com/BlacketWare/Docs/tree/master/api/leaderboard.md)

## listBazaar
Arguments:

```
item    : string - the item name
price   : int - the item's price
```

List a Blook on the Bazaar.<br>

##### Defined in [api/bazaar.md](https://github.com/BlacketWare/Docs/tree/master/api/bazaar.md)

## news
Arguments: none<br>
Get the instance's current news.

##### Defined in [api/news.md](https://github.com/BlacketWare/Docs/tree/master/api/news.md)

## open
Arguments:

```
pack    : string - pack name
```

Open a pack.

##### Defined in [api/open.md](https://github.com/BlacketWare/Docs/tree/master/api/open.md)

## packs
Arguments: none<br>
Get the instance's current packs.

##### Defined in [api/packs.md](https://github.com/BlacketWare/Docs/tree/master/api/packs.md)

## rarities
Arguments: none<br>
Get the instance's current rarity information.

##### Defined in [api/rarities.md](https://github.com/BlacketWare/Docs/tree/master/api/rarities.md)

## removeBazaar
Arguments:

```
id    : string - the item's ID.
```

Remove one of your offers from the bazaar.<br>

##### Defined in [api/bazaar.md](https://github.com/BlacketWare/Docs/tree/master/api/bazaar.md)

## sell
Arguments:

```
blook    : string - blook name
quantity : int - amount of blooks to sell, defaults to 1 if not specified
```

Sell blook(s).

##### Defined in [api/sell.md](https://github.com/BlacketWare/Docs/tree/master/api/sell.md)

## setBanner
Arguments:

```
name    : string - the new banner
```

Set the bot's banner, if the bot has plus.

##### Defined in [api/set.md](https://github.com/BlacketWare/Docs/tree/master/api/set.md)

## setProfile
Arguments:

```
name    : string - the new profile blook
```

Set the bot's profile Blook. The bot MUST have the blook.

##### Defined in [api/set.md](https://github.com/BlacketWare/Docs/tree/master/api/set.md)

## user
Arguments:

```
user    : string - the user's name, leave blank for bot.
```

Get a user's information.

##### Defined in [api/user.md](https://github.com/BlacketWare/Docs/tree/master/api/user.md)