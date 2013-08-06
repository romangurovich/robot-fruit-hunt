function new_game() {
}

function make_move() {
   var board = get_board();

   // we found an item! take it!
   if (has_item(board[get_my_x()][get_my_y()])) {
      return TAKE;
   }

   // looks like we'll have to keep track of what moves we've looked at
   toConsider = new Array();
   considered = new Array(HEIGHT);
   for (var i = 0; i < WIDTH; i++) {
      considered[i] = new Array(HEIGHT);
      for (var j = 0; j < HEIGHT; j++) {
         considered[i][j] = 0;
      }
   }

   // let's find the move that will start leading us to the closest item
   return findMove(new node(get_my_x(), get_my_y(), -1));
}

function findMove(n) {
   // closest item! we will go to it
   if (has_item(get_board()[n.x][n.y])) {
      return n.move;
   }

   var possibleMove = n.move;

   // NORTH
   if (considerMove(n.x, n.y-1)) {
      if (n.move == -1) {
         possibleMove = NORTH;
      } 
      toConsider.push(new node(n.x, n.y-1, possibleMove));
   } 

   // SOUTH
   if (considerMove(n.x, n.y+1)) {
      if (n.move == -1) {
         possibleMove = SOUTH;
      } 
      toConsider.push(new node(n.x, n.y+1, possibleMove));
   } 

   // WEST
   if (considerMove(n.x-1, n.y)) {
      if (n.move == -1) {
         possibleMove = WEST;
      } 
      toConsider.push(new node(n.x-1, n.y, possibleMove));
   } 

   // EAST 
   if (considerMove(n.x+1, n.y)) {
      if (n.move == -1) {
         possibleMove = EAST;
      }
      toConsider.push(new node(n.x+1, n.y, possibleMove));
   } 

   // take next node to bloom out from
   if (toConsider.length > 0) {
      var next = toConsider.shift();
      return findMove(next);
   }

   // no move found
   return -1;
}

function considerMove(x, y) {
   if (!isValidMove(x, y)) return false;
   if (considered[x][y] > 0) return false;
   considered[x][y] = 1;
   return true;
}

function isValidMove(x, y) {
   if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return false;
   return true;
}

function node(x, y, move) {
   this.x = x;
   this.y = y;
   this.move = move;
}

