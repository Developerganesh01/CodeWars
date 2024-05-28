#include<bits/stdc++.h>
using namespace std;
#define ll long long 
#define vll vector<ll>
#define vi vector<int>
#define vpll vector<pair<ll,ll>>
#define vpii vector<pair<int,int>>
void solve()
{
  ll n;
  cin>>n;
  vector<int>v(n);
  for(int i=0;i<n;i++)
  {
    cin>>v[i];
  }
  //{{a,b},c}=ct
  map<pair<pair<ll,ll>,ll>,ll>mp1;
  //{a,b}={c,ct}
  map<pair<ll,ll>,vector<pair<ll,ll>>>mp2;
  //{b,c}={a,ct}
  map<pair<ll,ll>,vector<pair<ll,ll>>>mp3;
  //{a,c}={b,ct}
  map<pair<ll,ll>,vector<pair<ll,ll>>>mp4;
  for(int i=0;i<n-2;i++)
  {
    int a=v[i],b=v[i+1],c=v[i+2];
    mp1[{{a,b},c}]++;
  }
  map<pair<ll,ll>,ll>f1,f2,f3;
  for(auto it:mp1)
  {
    ll a=it.first.first.first,b=it.first.first.second,c=it.first.second,ct1=it.second;
    //a b match
    f1[{a,b}]+=ct1;
    //bc match
     f2[{b,c}]+=ct1;
    //ac match
     f3[{a,c}]+=ct1;
  }
  ll ans=0;
  for(auto it:mp1)
  {
    ll a=it.first.first.first,b=it.first.first.second,c=it.first.second,ct1=it.second;
    //a b match
    ans+=(ct1*(f1[{a,b}]-ct1));
    //bc match
     ans+=(ct1*(f2[{b,c}]-ct1));
    //ac match
     ans+=(ct1*(f3[{a,c}]-ct1));
  }
  cout<<ans<<"\n";
}
int main()
{
  ios_base :: sync_with_stdio(0);
  cin.tie(nullptr); cout.tie(nullptr);
  int t=1;
  while(t--)
  {
    solve();
  }
  return 0;
}