#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
ll rec(vector<int>&g,vector<int>&score,vector<int>&vis,ll prev,int pos,int op)
{
  if(op==0)
  {
    return 0;
  }
  vis[pos]=1;
  ll ans=prev+(op)*1ll*(score[pos]);
  if(!vis[g[pos]])
  {
    ans=max(ans,rec(g,score,vis,0ll+prev+score[pos],g[pos],op-1));
  }
  return ans;

}
void solve()
{
  ll n,turns,pb,ps,sb=0,ss=0;
  cin>>n>>turns>>pb>>ps;
  vector<int>p(n+1),score(n+1);
  for(int i=0;i<n;i++)cin>>p[i+1];
  for(int i=0;i<n;i++)cin>>score[i+1];
  vector<int>vis(n+1,0);
  sb=rec(p,score,vis,0,pb,turns);
  vis.assign(n+1,0);
  ss=rec(p,score,vis,0,ps,turns);
  if(sb>ss)
  {
    cout<<"Sasha"<<"\n";
  }else if(ss>sb)
  {
    cout<<"Sasha"<<"\n";
  }else{
    cout<<"Draw"<<"\n";
  }

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