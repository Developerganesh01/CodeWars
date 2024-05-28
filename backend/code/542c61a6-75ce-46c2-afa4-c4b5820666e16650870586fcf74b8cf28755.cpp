#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
void solve()
{
  ll n,sum=0,curr=0,carry=0,found=0;
  stack<ll>me;
  string you;
  cin>>n>>you;
  for(auto it:you)sum+=(it-'0');
  for(int i=n-1;i>=0;i--)
  {
    curr=sum+carry;
    me.push(curr%10);
    carry=curr/10;
    sum-=(you[i]-'0');
  }
  me.push(carry);
  while(!me.empty())
  {
    if(me.top()!=0)
    {
      found=1;
    }
    if(found)
    {
      cout<<me.top();
    }
    me.pop();
  }
  cout<<"\n";
}
int main()
{
  int t=1;
  while(t--)
  {
    solve();
  }
  return 0;
}